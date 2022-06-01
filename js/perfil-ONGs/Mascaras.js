function mascaraCelular(celular) {

    celular.value = celular.value.replace(/[^\d]/g, "")
    celular.value = celular.value.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3")

}