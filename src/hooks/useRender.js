import { useEffect } from "react";
/***
 * @param {*} type wehre message is shown console | document
 * @param {*} text Text to display
 */

function useRender(text = 'Component Renders', type = 'console') {
    useEffect(()=>{
        switch (type) {
            case 'document' : {
                const node = document.createElement("div")
                node.innerText = text
                document.body.appendChild(node)
            }
            case 'console' : {
                console.log(text, "component is rendered");
            }       
        }
    })
}
export default useRender;