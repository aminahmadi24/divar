/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option module for categories
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          CreateOption:
 *              type: object
 *              properties: 
 *                  title:
 *                      type: string
 *                  key: 
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum: [number, string, boolean, array]
 *                  list: 
 *                      type: array
 *                      items:
 *                          type: string
 *                  guide:
 *                      type: string
 *                  required:
 *                      type: boolean
 *                  category:
 *                      type: string
 *              required:
 *                  -   title
 *                  -   key    
 *                  -   type
 *                  -   category
 * 
 *          UpdateOption:
 *              type: object
 *              properties: 
 *                  title:
 *                      type: string
 *                  key: 
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum: [number, string, boolean, array]
 *                  list: 
 *                      type: array
 *                      items:
 *                          type: string
 *                  guide:
 *                      type: string
 *                  required:
 *                      type: boolean
 *                  category:
 *                      type: string
 */

/**
 * @swagger
 * paths:
 *  /option:
 *      post:
 *          summary: Create option for categories
 *          tags: 
 *              -   Option
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#components/schemas/CreateOption"
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/CreateOption"
 *          responses:
 *              201:
 *                  description: Created
 */

/**
 * @swagger
 * paths:
 *  /option/{id}:
 *      put:
 *          summary: Update an option 
 *          tags: 
 *              -   Option
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string    
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#components/schemas/UpdateOption"
 *                  application/json:
 *                      schema:
 *                          $ref: "#components/schemas/UpdateOption"
 *          responses:
 *              200:
 *                  description: Success
 */
/**
 * @swagger
 * paths:
 *  /option/by-category-id/{categoryId}:
 *      get:
 *          summary: Get options of a category
 *          tags: 
 *              -   Option
 *          parameters:
 *              -   in: path
 *                  name: categoryId
 *                  type: string
 *          responses:
 *              200:
 *                  description: Ok
 */

/**
 * @swagger
 * paths:
 *  /option/by-category-slug/{slug}:
 *      get:
 *          summary: Get options of a category based on category's slug
 *          tags: 
 *              -   Option
 *          parameters:
 *              -   in: path
 *                  name: slug
 *                  type: string
 *          responses:
 *              200:
 *                  description: Ok
 */

/**
 * @swagger
 * paths:
 *  /option/{id}:
 *      get:
 *          summary: Get an option by Id 
 *          tags: 
 *              -   Option
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: Ok
 */

/**
 * @swagger
 * paths:
 *  /option:
 *      get:
 *          summary: Get all options 
 *          tags: 
 *              -   Option
 *          responses:
 *              200:
 *                  description: Ok
 */

/**
 * @swagger
 * paths:
 *  /option/{id}:
 *      delete:
 *          summary: Delete an option by Id
 *          tags: 
 *              -   Option
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: Ok
 */