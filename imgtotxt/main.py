# This is a sample Python script.

# Press <no shortcut> to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

# Use a pipeline as a high-level helper
from transformers import DetrImageProcessor, DetrForObjectDetection, pipeline
import torch
from PIL import Image, ImageOps, ImageFilter
import requests
from memory_profiler import profile
import pytesseract
from yandex_gpt import YandexGPT, YandexGPTConfigManagerForAPIKey
import asyncio
from dotenv import load_dotenv
import os

# Load environment variables from.env file
load_dotenv()

# Specify the path to the Tesseract executable
# This path varies depending on your installation
# For example, on Windows: "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"
#pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'

catalog_id = os.getenv("YANDEX_CATALOG_ID")
api_key=os.getenv("YANDEX_API_KEY")
image_path=os.getenv("IMAGE_PATH")

# Setup configuration (input fields may be empty if they are set in environment variables)
config = YandexGPTConfigManagerForAPIKey(model_type="yandexgpt", catalog_id=catalog_id, api_key=api_key)
# Instantiate YandexGPT
yandex_gpt = YandexGPT(config_manager=config)


@profile
def detect_objects(image):
    # you can specify the revision tag if you don't want the timm dependency
    processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-50", revision="no_timm")
    model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-50", revision="no_timm")

    inputs = processor(images=image, return_tensors="pt")
    outputs = model(**inputs)

    # convert outputs (bounding boxes and class logits) to COCO API
    # let's only keep detections with score > 0.9
    target_sizes = torch.tensor([image.size[::-1]])
    results = processor.post_process_object_detection(outputs, target_sizes=target_sizes, threshold=0.9)[0]

    for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
        box = [round(i, 2) for i in box.tolist()]
        print(
            f"Detected {model.config.id2label[label.item()]} with confidence "
            f"{round(score.item(), 3)} at location {box}"
        )


@profile
def text_from_image(image):
    pipe = pipeline("image-to-text", model="raxtemur/trocr-base-ru")
    print(pipe(image))


def tesseract(image):
    # Use Tesseract to do OCR on the image
    text = pytesseract.image_to_string(image, lang='rus')

    # Print the extracted text
    return text


# Async function to get completion
async def yandexGPT(text):
    messages = [
        {"role": "system", "text": "Суммаризируй текст, который я напишу в следующем сообщении"},
        {"role": "user", "text": text},
        {"role": "system", "text": "Придумай короткую историю на эту тему"},
    ]
    completion = await yandex_gpt.get_async_completion(messages=messages)
    print(completion)


if __name__ == '__main__':
    # Нельзя просто взять и распознать текст
    #url = "https://habrastorage.org/r/w1560/getpro/habr/upload_files/ab8/d8b/f38/ab8d8bf388f101f08f4e5aeae3fc220e.jpeg"

    # Новый вискас Теперь гороховый
    #url = "https://avatars.dzeninfra.ru/get-zen_doc/1857933/pub_5e931f9a0a471779a85444e0_5e9321ccbe5bae634e2074b7/scale_1200"

    #image = Image.open(requests.get(url, stream=True).raw)

    # какая-то переписка из телеги
    image = Image.open(image_path)

    #detect_objects(image)
    #text_from_image(image)

    tesseract(image)
    print('-----------')

    # Preprocess your images: Depending on the quality and condition of your images, you might need to preprocess them
    # (e.g., convert to grayscale, apply thresholding, denoise) to improve OCR accuracy.
    gray_image = image.convert("L")  # L stands for luminance
    binary_image = ImageOps.autocontrast(gray_image, cutoff=10)
    denoised_image = binary_image.filter(ImageFilter.MedianFilter(size=3))
    resized_image = denoised_image.resize((800, 800), Image.BICUBIC)
    resized_image.save("resized_image.jpg")

    # Remember, the effectiveness of these preprocessing steps can vary depending on the quality and characteristics of
    # the input images. Always test and evaluate the output to determine the most effective preprocessing pipeline for your use case.
    extracted = tesseract(resized_image)
    print(extracted)
    print('------------------')

    # Run the async function
    #asyncio.run(yandexGPT(extracted))