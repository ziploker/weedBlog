class User < ApplicationRecord

    has_secure_password

    validates_presence_of :email
    
    validates_uniqueness_of :email

    before_save :downcase_fields

   def downcase_fields
      self.email.downcase!
   end

    

    
end
