/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category module
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  slug: 
 *                      type: string
 *                  parent: 
 *                      type: string
 *              required:
 *                  -   name
 *                  -   icon
 */

/**
 * @swagger
 * /category:
 *  post:
 *      summary: Create category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content: 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#components/schemas/CreateCategory"
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/CreateCategory"
 *      responses: 
 *          201: 
 *              description: Created
 */
/**
 * @swagger
 * /category:
 *  get:
 *      summary: Get all categories
 *      tags:
 *          -   Category
 *      responses: 
 *          200:
 *              description: Success
 */