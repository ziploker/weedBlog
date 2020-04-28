class StoriesController < ApplicationController


    def index
        
    end

    def new
        
    end

    def create
        story = Story.new(event_params)
        if story.save
          render json: story
        else
          render nothing: true, status: :bad_request
        end
      end
      
      

    def edit
        
    end

    def show
        
    end


    private
      
      def event_params
        params.require(:event).permit(:title, :keywords, :body)
      end
end
