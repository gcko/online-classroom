/**
 * @swagger
 * tags:
 *   name: Submissions
 *   description: Submission access
 */

const { Router } = require('express');

const router = Router();

/**
 * @swagger
 * path:
 *  /submissions/:
 *    get:
 *      summary: Get an object of submissions
 *      tags: [Submissions]
 *      responses:
 *        "200":
 *          description: An object of Submission schemas
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                additionalProperties: true
 *                minProperties: 3
 *                maxProperties: 3
 *              examples:
 *                Example with submissions:
 *                  value:
 *                    {
 *                      '1': {
 *                        id: '1',
 *                        text: 'console.log("I am submitted code!")',
 *                        roomId: '11111111',
 *                      },
 *                    }
 *                Example with no submissions:
 *                  value:
 *                    {
 *                    }
 */
router.get('/', (req, res) => {
  res.send(req.services.submission.getSubmissions());
});

/**
 * @swagger
 * path:
 *  /submissions/:
 *    post:
 *      summary: Post an new Submission to a Room by id or update an existing Submission
 *      tags: [Submissions]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - submission
 *                - roomId
 *              properties:
 *                submission:
 *                  type: string
 *                  description: Code submission as a string.
 *                roomId:
 *                  type: string
 *                  pattern: ^[0-9a-zA-Z]{8}$
 *                  description: Foreign key to an existing room.
 *      responses:
 *        "200":
 *          description: A Submission schema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Submission'
 *        "404":
 *          description: The supplied room ID does not exist
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    description: The error message supplied from the server.
 */
router.post('/', (req, res) => {
  const { roomId, submission } = req.body;
  // simply overwrite any existing submission
  const submissionOrFalse = req.services.submission.createOrUpdateSubmission(
    roomId,
    submission,
    req.services.room
  );

  if (submissionOrFalse === false) {
    res.status(404);
    return res.send({ error: `The room ${roomId} does not exist.` });
  }
  return res.send(submissionOrFalse);
});

module.exports = router;
