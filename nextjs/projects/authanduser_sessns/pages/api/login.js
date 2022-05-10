export default (req, res) => {
          const { method } = req;
          const { email, password } = req.body;

          if (method !== 'POST') {
                    return res.status(404).end();
          }

          if (!email || !password) {
                    return res.status(400).json(
                              {
                                        error: 'Missing required params'
                              }
                    )
          }
}


function authenticateUser(email, password) {
          const validEmail = 'johndoe@somecompany.com';
          const validPassword = 'strongpassword';

          if (email === validEmail && password === validPassword) {
                    return {
                              id: 'f678f078-fcfe-43ca-9d20-e8c9a95209b6',
                              name: 'John Doe',
                              email: 'johndoe@somecompany.com',
                    }
          }

          return null;
}


