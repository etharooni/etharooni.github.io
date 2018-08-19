	public static void main(String[] args) throws IOException{
		File gradientFile = new File("C:/Users/ethan/Desktop/ethan.bmp");
		BufferedImage gradient = ImageIO.read(gradientFile);
		System.out.print("[");
		for(int y=0; y<gradient.getHeight(); y++){
			System.out.print("[");
			for(int x=0; x<gradient.getWidth(); x++){
				long prob = gradient.getRGB(x, y) & 0xFF;
				System.out.print(prob);
				if(x != gradient.getWidth() -1) System.out.print(",");
			}
			System.out.print("]");
			if(y != gradient.getHeight() -1) System.out.print(",");
		}
		System.out.print("]");
	}
}