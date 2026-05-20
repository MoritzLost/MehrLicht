import Tobii from "@midzer/tobii";

new Tobii({
    selector: '.lightbox',
    captions: false,
    counter: false,
    zoom: false,
});

// Invoker API fallback for browsers that don't support commandfor/command
if (!('commandForElement' in HTMLButtonElement.prototype)) {
    document.querySelectorAll<HTMLButtonElement>('button[commandfor]').forEach(button => {
        const target = document.getElementById(button.getAttribute('commandfor')!);
        if (!(target instanceof HTMLDialogElement)) return;
        button.addEventListener('click', () => {
            const command = button.getAttribute('command');
            if (command === 'show-modal') target.showModal();
            else if (command === 'close') target.close();
        });
    });
}

