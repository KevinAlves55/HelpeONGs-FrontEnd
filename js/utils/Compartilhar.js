function share(){
	if (navigator.share !== undefined) {
		navigator.share({
			title: 'HelpONGs Feed',
			text: 'Veja esse POST interessante',
			url: 'http://127.0.0.1:5501/feed.html',
		})
		.then(() => console.log('Successful share'))
		.catch((error) => console.log('Error sharing', error));
	} else {
        console.log("Não é seguro");
    }
}