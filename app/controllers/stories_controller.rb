class StoriesController < ApplicationController

  #skip_before_action :verify_authenticity_token
   
  #sets @current_user if session[:id] exists
   include CurrentUserConcern

  def index
      
  end

  def new

    if @current_user
      @loggedInStatus = "LOGGED_IN"
      
    else
      @loggedInStatus = "NOT_LOGGED_IN"
      
    end

    puts "-----------new story------"
    
      
  end

  def update
    puts "update go!!!!!!!!!!1"
  
    @story = Story.find(params[:id])

    if @story.update(event_params)
      redirect_to '/blog/' + params[:event][:slug]
      puts "good2g0"
    else
      #render 'edit'
      puts "failed"
    end

  end

  
  def create

      if session["user_id"]
            
        @current_user = User.find(session[:user_id])
        
      end
      story = Story.new(event_params)
      
      story.author_nick = @current_user.nick
      story.author_avatar = @current_user.avatar_url

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


    if @current_user
      @loggedInStatus = "LOGGED_IN"
      @story2edit = Story.find(params[:id])
     
      
    else
      @loggedInStatus = "NOT_LOGGED_IN"
      redirect_to "/login"
      
    end

    
  end

  def show
      
  end


  private
    
    def event_params
      params.require(:event).permit(:title, :slug, :keywords, :body, :image, :url, :topic, :author_nick, :author_avatar)
    end
end
