import NavPills from "./../services/navPillApi.js";
import TabPanesApi from "./../services/tabPanesApi.js"

const getDOMById = (id) => document.getElementById(id);

const navPills = new NavPills();
const tabPanesApi = new TabPanesApi();

const getNavPills = () => {
    const data = navPills.fetchInfo();
    data
        .then((result) => {
            renderUIForNavPills(result.data);
        })
        .catch((error) => console.log(error));
}

getNavPills();

const renderUIForNavPills = (data) => {
    const content = "";
    for(let item of data) {
        content += `
        <li class="nav-item">
            <a class="nav-link active" href="#" onclick="gettabPanesByType(${item.type})">${item.showName}</a>
        </li>
        `;
    }

    getDOMById("nav-pills").innerHTML = content;
}

const gettabPanesByType = (type) => {
    const data = tabPanesApi.fetchInfo();
    data
        .then((result) => {
            const tabPanes = result.data;
            const tabPanesByType = tabPanes.filter((type) => tabPanes.type.toLowerCase() === type.toLowerCase())
            renderUIForTabPanes(tabPanesByType);
        })
        .catch((error) => console.log(error));
}
window.gettabPanesByType(type) = gettabPanesByType(type);