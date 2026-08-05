import i18n from "i18next";

import {
initReactI18next
}
from "react-i18next";


const resources={


fr:{

translation:{


nav:{

home:"Accueil",

projects:"Projets",

contact:"Contact",

blog:"Blog"

},


hero:{

title:"Développeuse Full Stack",

description:
"Je transforme vos idées en applications digitales performantes."

},


button:{

projects:"Voir mes projets",

contact:"Me contacter"

}


}

},



en:{


translation:{


nav:{

home:"Home",

projects:"Projects",

contact:"Contact",

blog:"Blog"

},


hero:{

title:"Full Stack Developer",

description:
"I transform ideas into scalable digital products."

},


button:{

projects:"View projects",

contact:"Contact me"

}


}

}


};



i18n

.use(
initReactI18next
)

.init({

resources,

lng:"fr",

interpolation:{

escapeValue:false

}

});


export default i18n;