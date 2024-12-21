const jwts = require('jsonwebtoken');
const JWt_SECRETs = 'myjwtsom@u';

const fetchUser=(req:any,res:any,next:any)=>{
const token=req.header("auth-token");
if(!token) 
{
    res.status(401).send({error: 'Invalid token please authenticate using valid tokens'});
}
try {
    const data=jwts.verify(token,JWt_SECRETs);
    req.user = data.user;
    next();
} catch (error) {
    res.status(401).send({error: 'Invalid token please authenticate using valid token'});
}
}
 export default fetchUser;