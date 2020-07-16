class User < ApplicationRecord

   has_secure_password

   validates_presence_of :first
   validates_presence_of :last
   validates_presence_of :email
   validates_uniqueness_of :email

   validates :password, :presence => true,
                        :confirmation => true,
                        :length => {:within => 6..40},
                        :on => :create
   validates :password, :confirmation => true,
                        :length => {:within => 6..40},
                        :allow_blank => true,
                        :on => :update
    
    
   #before_save :downcase_fields

   #def downcase_fields
      #self.email.downcase!
   #end


   
   
   
    

    
end
