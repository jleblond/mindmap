module ImageProcessing
  class ImageProcessing
    def initialize(image_src)
      @image = ImageProcessing::MiniMagick.read(image_src)
    end


  end
end