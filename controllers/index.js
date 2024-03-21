import NavPills from "./../services/navPillApi.js";
import TabPanesApi from "./../services/tabPanesApi.js"

const getDOMById = (id) => document.getElementById(id);

const navPills = new NavPills();
const tabPanesApi = new TabPanesApi();
const getNavPills = () => {
    const data = navPills.fetchData();
    data
        .then((result) => {
            renderUIForNavPills(result.data);
            gettabPanesByType(result.data[0].type);
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
    let contentHTML = data.reduce((content, item) => {
        return (
            content += `
            <li class="nav-item">
                <a class="nav-link active" href="#" onclick="gettabPanesByType('${item.type}')">${item.showName}</a>
            </li>`
        );
    }, "");
    getDOMById("nav-pills").innerHTML = contentHTML;
}

const renderUIForTabPanes = (data) => {
    let contentHTML = data.reduce((content, item) => {
        const imgPath = `./${item.imgSrc_jpg}`;
        return (
            content += `<div class="card col-md-3">
            <img src="${imgPath}" class="card-img-top" alt="'${item.name}'">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <a href="#" class="btn btn-primary">Change</a>
            </div>
          </div>`
        );
    }, "");
    getDOMById("tab-panes").innerHTML = contentHTML;
}