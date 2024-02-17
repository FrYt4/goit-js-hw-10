const error = document.querySelector('.error');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');


export function hideLoader(){
    loader.style.display = 'none';
}

export function showLoader() {
    loader.style.display = 'block';
}


export function hideError(){
    error.style.display = 'none';
}

export function showError() {
    error.style.display = 'block';
}

export function hidecatInfo(){
    catInfo.style.display = 'none';
}

export function showcatInfo() {
    catInfo.style.display = 'block';
}
