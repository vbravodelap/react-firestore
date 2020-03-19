
export const iniciarSesion = (dispatch, firebase, email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            firebase.db
            .collection('Users')
            .doc(auth.user.uid)
            .get()
            .then(doc => {
                const usuarioDB = doc.data();
                dispatch({
                    type: "INICIAR_SESION",
                    session: usuarioDB,
                    autenticado: true
                })
                resolve();
            });
        })
        .catch(error => {
            console.log('error: ', error)
        })
    });
};

export const crearUsuario = (dispatch, firebase, usuario) => {
    return new Promise((resolve, reject) => {
        firebase.auth
        .createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(auth => {
            firebase.db
            .collection('Users')
            .doc(auth.user.uid)
            .set({
                id: auth.user.uid,
                email: usuario.email,
                nombre: usuario.nombre,
                apellido: usuario.apellido
            }, {merge: true}
            )
            .then(doc => {
                usuario.id = auth.user.uid;
                dispatch({
                    type: "INICIAR_SESION",
                    session: usuario,
                    autenticado: true
                })
                resolve();
            })
        });
    })
    .catch(error => {
        console.log('error: ', error);
    })
}

export const salirSesion = (dispatch, firebase) => {
    return new Promise((resolve, reject) => {
        firebase.auth.signOut().then(salir => {
            dispatch({
                type: "SALIR_SESION",
                nuevoUsuario: {
                    nombre: '',
                    apellido: '',
                    email: '',
                    foto: '',
                    id: '',
                    telefono: '',
                },
                autenticado: false
            });
            resolve();
        })
    })
}