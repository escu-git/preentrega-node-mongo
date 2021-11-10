const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

const user = new schema.Entity('usuario', {}, {idAttribute:'email'});

const mensajes = new schema.Entity('mensajes', {
    mensajes:user
}, {idAttribute:'date'});


module.exports={normalizr, normalize, denormalize, user, mensajes}

