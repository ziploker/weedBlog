class CommentsController < ApplicationController

    def create

        #things needed to post comment
        # ID of article

        ##things needed to post comment on a comment
        # ID of Comment

        @comment = params['event']['comment']
        @articleID = params['event']['articleID']
        @commentID = params['event']['commentID']

        s = Story.find_by(id: @articleID)

        s.comments.create(body: @comment)

       
        @comments = s.comments.as_json(include: [:comments])
        
        render json: {


            #article: @article_info,
            comments: @comments
        }

       


    end
end
