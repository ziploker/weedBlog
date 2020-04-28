class LandingsController < ApplicationController




    def index


        #@story = Story.order("created_at").last

        @story = Story.all

        @payload = {pathname: "/yadayada"}
        
    end
end
