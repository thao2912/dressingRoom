import NavPills from "./../services/navPillApi.js";
import TabPanesApi from "./../services/tabPanesApi.js"

const getDOMById = (id) => document.getElementById(id);

const navPills = new NavPills();
const tabPanesApi = new TabPanesApi();
let dataType = "";

const getNavPills = () => {
    const data = navPills.fetchData();
    data
        .then((result) => {
            renderUIForNavPills(result.data);
            dataType = result.data[0].type;
            gettabPanesByType(dataType);
        })
        .catch((error) => console.log(error));
}

getNavPills();

const gettabPanesByType = (type) => {
    const data = tabPanesApi.fetchData();
    data
        .then((result) => {
            const tabPanes = result.data;
            const tabPanesByType = tabPanes.filter((tabPane) => type.toLowerCase() === tabPane.type.toLowerCase())
            renderUIForTabPanes(tabPanesByType);
        })
        .catch((error) => console.log(error));
}
window.gettabPanesByType = gettabPanesByType;

const renderUIForNavPills = (data) => {
    // let content = "";
    // for(let item of data) {
    //     content += `
    //     <li class="nav-item">
    //         <a class="nav-link active" href="#" onclick="gettabPanesByType('${item.type}')">${item.showName}</a>
    //     </li>
    //     `;
    // }
    let contentHTML = data.reduce((content, item) => {
        return (
            content += `
            <li class="nav-item">
                <a class="nav-link active" href="#" onclick="gettabPanesByType('${item.type}')">${item.showName}</a>
            </li>`
            );
    } , "");
    getDOMById("nav-pills").innerHTML = contentHTML;
}

const renderUIForTabPanes = (data) => {
    getDOMById("tab-panes").innerHTML = "";
}