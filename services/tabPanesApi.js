class TabPanesApi {
    fetchData = () => axios({
        url: 'https://65faae4a3909a9a65b1b2627.mockapi.io/DressRoom-ES6/tabPanes',
        method: 'GET',
    });
}

export default TabPanesApi;