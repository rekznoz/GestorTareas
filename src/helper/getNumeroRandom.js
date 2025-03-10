// funcion que simula una promesa que se resuelve con un numero random
const getNumeroRandom = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * 10))
        }, 2000)
    })
}

export default getNumeroRandom
