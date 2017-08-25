connect email to my account
info texts for media uploads
media uploads re-style
directed at validation only happens once.
keep sidebar open in edit view?
back button on sidebar
text for email invite

:::::DONE:::::

SASS compiler with Webpack
Admin navigation routes:
- users
- rhizomes
Validations form
activeContent can be array or string
audio upload
collage view: 
- make resizable when editing
- make corner dragger lower indexv
- remove editing elements when viewing
-hitting “Save” on the ‘new publication’ page should take you directly into the ‘edit contents’ page
-the “delete” button needs a few warnings before just nuking the pub!
-hitting ‘publish’ should be a terminal destination in that you go to the forcemap view AND close the sidebar
-i dont remember if we talked about this, but are we going to have a ‘user’ page at all? (especially if we’re including anonymity). this can possibly fall as just a filter
-logout should be in the ‘right’ sidebar (from what i remember, the right one had the login/logout, and was the ‘user’ one (hence the ‘Your Publications’ being there), and the left sidebar has the about/publications/etc…
publish error: shouldn't publish unless validation ok.
Validation as behaviours for all views
-in the ‘new publication’ view, “Publication Date:” should default to today (and have a little calendar icon in the date field)
Tag Pool
Author pool 
autocomplete for all form views
new pub and details save doesn't navigate right (default select item probelmd?)
remove details page and have type selector in sidebar
change pub type button
position of validation error text
change back button to "home"
split editing views (in folders)
-hitting the X in the sidebar should return you to the previous view (so if im in the ‘Your Publications’ view, and click on ‘edit details’ or whatever, if I X out of that, it should return me to ‘Your Publications’, so the X should be local/relative to the ‘current sidebar view’, rather than X-ing out of the whole sidebar altogether)
change landing sidebar page to 'home'
iframes doesn't work, change to new window link
auto-complete for list of items
populate contributor pool
refactor sidebarright into seperate views for form / extras
make helpers for edit_pub_controler
make passwords unreadable in forms
my contributors
refresh tags and contributors
SERVER FUCKING BUGGY!!!! (creating users weird)
remove invite from user model
different template for published or unpublished pubs
check EVERY call to server is in correct promise format
edit profile page
double newPub save fixed
refactor server
fix url pub type
collage edit view
add new header for pub info
refactor authenticate calls (from edit user etc...)
invite to publish email/username (add array of pending pubs to user)
what happens when user is deleted?
home button in "login" view
markdown view
don't show pub if not published
tidy up scss files for Rod
remove unusued dependencies
sepertate storage for uploads
move downloads folder outside of dist
canvas mode not loading files
persist login
save new draft type should go straight to edit that pub
fix autopulate bug
change pub bug
don't go back to d3 view after pub save.
change view when you get log out
change edit pub view on select taype change and put type selector at the top of the form
newpub save error!!!!
refactor server
before any navigation, if user not logged in sidebar "home"
automatically switch editing views when selecting type
make image upload 100%
make clicking pub go to edit view, remove edit button, add preview button to edit sidebar
preview button
ALERTS:
-feedback for failed/successful login
-save success
-redo current warnings
Amazon S3 hosting
add published date
upload file feedback and file size restriction
videos added to collage
nodemailer and auto send email invite
remove new pub button and add new rhizome view
move sidebars
youtube video not working in collage
fix published date
D3 view add tags connections + re-style
D3 view hover
change names of tags and directedAt
profile view rows not columns and "password" / "repeat password"
add texts

QUESTIONS FOR ROD & ANG:
view for single media pubs?
setup host and email
seeding the rhizome