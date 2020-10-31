class LandingsController < ApplicationController

    include Rails.application.routes.url_helpers
    include CurrentUserConcern

    STORIES_PER_PAGE = 4

    def index

        @path = params[:path]
        #@story = Story.order("created_at").last

        @page = params.fetch(:page, 0).to_i
        
        @stories = Story.order("created_at DESC").offset(@page * STORIES_PER_PAGE).limit(STORIES_PER_PAGE)
        #@story = Story.all
        @googleGeoApi = Rails.application.credentials.dig(:google, :geoapi)

        puts @stories.inspect

        
        

        
        #puts "google api is = " + @googleGeoApi
        

        #@image = "http://localhost.com/" + @image

        #@image = polymorphic_url(lastStory.image)

        #@image = lastStory.image.service_url
        #@image = rails_blob_url(lastStory.image, disposition: "attachment")

        #@image = rails_blob_url(lastStory.image, only_path: true) if lastStory.image.attached?

        ##if @story.count > 0 

        ##    lastStory = Story.last
        
        ##    @image = lastStory.image.service_url&.split("?")&.first 
        ##    @imagelong = lastStory.image.service_url 
        ##end
    end



    def next_page

        puts "next----------------page"
        @page = params.fetch(:page, 0).to_i
        
        @stories = Story.order("created_at DESC").offset(@page * STORIES_PER_PAGE).limit(STORIES_PER_PAGE)

        render json: {
                
            
            stories: @stories
        }
    end


    def get_article_info

        puts " SLUG = " + params["data"]["slug"]

        @article_info = Story.find_by(slug: params["data"]["slug"])
        @comments = @article_info.comments.as_json(include: [:comments])
        puts @article_info.inspect

        if @current_user
            
            render json: {


                article: @article_info,
                comments: @comments,
                user: @current_user
            }

        else

            render json: {


                article: @article_info,
                comments: @comments
            }
        end
    end






end
