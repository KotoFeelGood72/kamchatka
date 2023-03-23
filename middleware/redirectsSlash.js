export default function(req, res, next) {
    if(req.url.indexOf('.') === -1 && !req.url.endsWith('/')) {
        const newPath = req.url + '/'
        res.writeHead(301, { Location: newPath })
        res.end();
    } else {
        next();
    }
}
