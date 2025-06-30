import qrcode
from PIL import Image, ImageOps

# Skapa QR-kod
def make_qrcode(data: str):
	qr = qrcode.QRCode(
		version=1,  # Version styr storleken på QR-koden
		error_correction=qrcode.constants.ERROR_CORRECT_L,  # Felkorrigering (L, M, Q, H)
		box_size=10,  # Storlek på varje pixel
		border=0 # Bredd på vit marginal runt QR-koden
	)

	qr.add_data(data)
	qr.make(fit=True)

	# Generera bild
	img = qr.make_image(fill="black", back_color="white")
	img = img.convert("RGB")
	# Byt ut svart till önskad färg (DC8AA1)
	img = ImageOps.colorize(img.convert("L"), black="#DC8AA1", white="white")

	# Spara eller visa den färgade QR-koden
	img.save("qr_code.png")
	img.show()

def main():
	print("Välkommen till QR-kod-generatorn!")
	url = input("Ange webbadress som ska kodas: ").strip()

	if not url:
		print("Ingen URL angavs. Avslutar.")
		return

	make_qrcode(url)
	print("Klar! Din QR-kod till " + url + " har sparats som 'qr_code.png'.")
	print("Avslutar.")

if __name__ == "__main__":
	main()
