# Complex API Costumes
> Galvanize project to practice building complex routes around a simple costume database.

## Install
1. Run `npm install`
2. Start in dev mode: `npm run dev`
3. Start in prduction mode: `npm start`

## Usage
The following routes are available:
Costumes:
* GET /costumes -> gets all costumes, with tags fully populated
* GET /costumes/`id` -> gets the costume with `id`
* POST /costumes/random/`number` -> builds a database of random costumes and tags with `number` entries
* POST /costumes -> adds a new costume from json in POST body
    required key/values: name, price
    optional key/values: description, tags (tags must be and array of uuid's of existing tags)
* PUT /costumes/`id` -> allows updating of exisitng costume fields from json in PUT body
    optional key/values: name, price, description, tags (tags must be and array of uuid's of existing tags)
* DELETE /costumes/`id` -> deletes the costume with `id`

Tags:
* GET /costumes/`id`/tags -> gets all tags for costume `id`
* GET /costumes/`id`/tags/`tag id` -> gets the `tag id` for costume `id`
* POST /costumes/`id`/tags/ -> adds a new tag to costume `id` based on json in POST body
    if "id": value is included in POST body, will add the exisiting tag from tags database
    if no "id": value is included, then:
      required key/value: name
      optional key/value: color
* PUT /costumes/`id`/tags/`tag id` -> updates the `tag id` if costume `id` contains it.
    Note that this will update the tag values for `tag id` for *ALL* costumes
* DELETE /costumes/`id`/tags/`tag id` -> removes the `tag id` from the list of tags for costume `id`
    Note that this *DOES NOT* remove the tag from other costumes or the tag database.

## Project Requirements
You will be tasked with building an API from scratch. This API should:
* Follow RESTful patterns
* Use an opinionated architecture (e.g. MVC)
* Include error handling
* Include nested resources
* Stores data in a file (e.g. .json, .csv)
* You may optionally test your project.

### Costume Shop
Build an API that represents products in a costume shop!

#### Costumes
* ID: (You Choose) A unique id that represents the costume. Created automatically.
* Name: (String) Name of the costume. Required.
* Price: (Number) Price of the costume. Cannot be less than 1 cent. Required.
* Description: (String) A description of the costume. Optional.
* Tags: (Array) An array of tags.
#### Tags
* ID: (You Choose) A unique id that represents the tag. Created automatically.
* Name: (String) Name of the tag. Cannot be longer than 10 characters. Required.
* Color: (String) A color to be associated with the tag. Must be a valid hex color code (e.g. #123456). Optional.
* Tags will have different IDs even if they have the same name and color.
#### Build RESTful routes so that you can:
* Create, Read, Update, and Delete costumes
* Create, Read, Update, and Delete tags through costumes
