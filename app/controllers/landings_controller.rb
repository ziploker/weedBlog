class LandingsController < ApplicationController

    include Rails.application.routes.url_helpers


    def index


        #@story = Story.order("created_at").last

        
        
        @story = Story.all

        

        

        #@image = "http://localhost.com/" + @image

        #@image = polymorphic_url(lastStory.image)

        #@image = lastStory.image.service_url
        #@image = rails_blob_url(lastStory.image, disposition: "attachment")

        #@image = rails_blob_url(lastStory.image, only_path: true) if lastStory.image.attached?

        if @story.count > 0 

            lastStory = Story.last
        
            @image = lastStory.image.service_url&.split("?")&.first 
            @imagelong = lastStory.image.service_url 
        end
    end
end
