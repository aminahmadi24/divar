/**
 * @swagger
 * tags:
 *  name: Auth 
 *  description: Auth module
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              properties:
 *                  mobile:
 *                      type: string
 *                      example: "09111111111"
 *              required: 
 *                  -   mobile
 *          CheckOTP:
 *              type: object
 *              properties:
 *                  mobile:
 *                      type: string
 *                      example: "09111111111"
 *                  code:
 *                      type: string
 *                      example: "11111"
 *              required: 
 *                  -   mobile
 *                  -   code
 */

/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *      summary: Send otp code 
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content: 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#components/schemas/SendOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/SendOTP"
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unautorized
 */
/**
 * @swagger
 * /auth/check-otp:
 *  post:
 *      summary: Login with OTP 
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content: 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#components/schemas/CheckOTP"
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/CheckOTP"
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unautorized
 */
/**
 * @swagger
 * /auth/logout:
 *  get:
 *      summary: Logout user 
 *      tags:
 *          -   Auth
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unautorized
 */