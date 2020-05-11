class StoriesController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
      
  end

  def new
      
  end

  def create
      story = Story.new(event_params)
      begin
      story.save!
      rescue ActiveRecord::RecordNotSaved => e
        puts story.errors.full_messages
      end
      
      
      #if story.save!

        #story.image.attach(event_params(:image))
        #render json: story
     # else
        #render nothing: true, status: :bad_request

      #  puts story.errors.full_messages
       # render :partial => "nothin"
      #end
    end
    
    

  def edit
      
  end

  def show
      
  end


  private
    
    def event_params
      params.require(:event).permit(:title, :keywords, :body, :image, :url)
    end
end
