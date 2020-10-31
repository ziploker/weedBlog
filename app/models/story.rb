class Story < ApplicationRecord

    has_one_attached :image

    validate :acceptable_image

    has_many :comments, as: :commentable, dependent: :destroy
    

    

    


    before_validation :beforeValidation
    
    after_validation :getKeyFromBlobAndAddItToStoryRecord
    
    before_save :beforeSave
    
    ######around_save :aroundSave
    
    ######after_save :afterSave

    before_create :convertToFriendlyDateFormat
    
    #######around_create :aroundCreate
    
    #######after_create :afterCreate
    
    after_commit :afterCommit
    after_rollback :afterRolback


    
    
    def beforeValidation

        puts "-----------beforeValidation------------"

        selfTest(self)

        puts "-----------beforeValidation------------"


        
    end

    def beforeSave


        puts "-----------beforeSave------------"

        selfTest(self)

        puts "-----------beforeSave------------"
    end

    def aroundSave


        puts "-----------aroundSave------------"
        #puts self.errors.full_messages
        selfTest(self)

        puts "-----------aroundSave------------"
    end

    def convertToFriendlyDateFormat

        puts "-----------beforeCreate------------"

        puts "created_at_date = " + self.created_at.to_s

        newTime = self.created_at.localtime.strftime("%b #{self.created_at.localtime.day.ordinalize}, %Y")

       
        puts "newTime = " + newTime.to_s

        

        self.date = newTime

        puts "-----------beforeCreate------------"
    end

    def aroundCreate

        puts "-----------aroundCreate------------"

        selfTest(self)

        puts "-----------aroundCreate------------"
    end

    def afterCreate

        puts "-----------afterCreate------------"

        selfTest(self)

        puts "-----------afterCreate------------"
    end

    def afterSave

        puts "-----------afterSave------------"

        #puts "created_at_date = " + self.created_at

        #newTime = self.created_at.strftime("%_m/%e/%Y %l:%M%P")

       
        #puts "newTime = " + newTime.to_s

        #lastRecord = Story.last

        #self.date = newTime

        
        
        
        
        
        

        selfTest(self)


        
        puts "-----------afterSave------------"
    end

    def afterCommit

        puts "-----------afterCommit------------"
        selfTest(self)

        puts "-----------afterCommit------------"
    end

    def afterRolback

        puts "-----------afterRolback------------"

        selfTest(self)
        puts "-----------afterRolback------------"
    end






    def acceptable_image
        return unless image.attached?

        #unless image.byte_size <= 1.megabyte
        #    errors.add(:image, "is too big")
        #end

        acceptable_types = ["image/jpeg", "image/png"]
        
        unless acceptable_types.include?(image.content_type)
            errors.add(:image, "must be a JPEG or PNG")
        end
    end

    

    def getKeyFromBlobAndAddItToStoryRecord

        puts "------------after_validation callback begin -------------------"
        
        
        if self.image.attached?
            url = self.image.service_url&.split("?")&.first
        
            puts "self = " + self.title
        
        
        
       
            self.url = url

        end


       

        puts "------------after_validation callback end -------------------"
    end

    
    
    def selfTest(x)

        #url = self.image.service_url&.split("?")&.first
        
        #puts "self.title = " + self.title

        #x.reload
            
        if x.created_at != nil
            
            puts "result is = " + x.created_at.to_s
        else
            puts "result is = nil"
        end
        
        
        
        
        
        
        
       
        

    end
end
