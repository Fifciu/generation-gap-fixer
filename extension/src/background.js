global.browser = require('webextension-polyfill');
import store from './store';
import Message from './components/Message'
import Vue from 'vue'

const DEV_MODE = true;
const API = 'https://hackapi.vuewordpress.io/api/v1/'

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const Client = {
    // It downloads WordsList, maps it and save #devMode
    async WordsList () {
        try {
            // let r = await fetch(`${API}words-list`)
            // let result = await r.json()

            // const dictionary = result.reduce((total, curr) => {
            //     total[curr.word] = curr.id
            //     return total
            // })
            
            console.log(dictionary)
            download(JSON.stringify(dictionary), 'dictionary.json', 'application/json');

        } catch (err) {
            if (DEV_MODE) {
                // No fallback!
                console.error('Could not fetch words-list', err)
            }
        } 
    }
};
// Client.WordsList()
    

    // Changin words on page
    // do {
    //     document.body.innerHTML =  document.body.innerHTML.replace('Chrome Extension', 'Dzban')
    // } while (document.body.innerHTML.indexOf('Chrome Extension') !== -1)

function applyMagic (node) {

    const dzban = node.querySelector('.dzban-message')
    if (!dzban) {
        return
    }

    const content = dzban.textContent

    new Vue({
        el: dzban,
        store,

        template: '<Message :content="content"/>',

        components: {
            Message
        },

        data () {
            return { 
                content: content
            }
        }

    })

}
    
        var target = document.body
        if (!target) { 
            console.log('Brak tarssgeta') 
        }
        
            // console.log(target.textContent)
        
            //fbNubFlyoutInner
            // create an observer instance
            // console.log(target)
            
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    // const messages = [...target.querySelectorAll('span:not([class])')]
                    if(mutation.target && mutation.target.classList && mutation.target.classList.contains('v-card')) {
                        if (mutation.target.children) {
                            for (let child of [...mutation.target.children]) {
                                applyMagic(child)
                            }
                        }
                    }
                });
            });
            
            // configuration of the observer:
            var config = { attributes: true, childList: true, characterData: true, subtree: true   }
            
            // pass in the target node, as well as the observer options
            observer.observe(target, config);
            // console.log(document.body)
            
            // later, you can stop observing
            // observer.disconnect();