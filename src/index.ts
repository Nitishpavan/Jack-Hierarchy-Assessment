import { HierarchyManager } from "./HierarchyManager";

const hm = new HierarchyManager();

const hierarchyId = hm.createHierarchy();

const franchiseId = hm.addNode(hierarchyId, hierarchyId, 
    {name: 'Nitish Jack Franchise Group of Colorado',
    type: 'FRANCHISE'
});

const northRegionId = hm.addNode(hierarchyId, franchiseId, 
    {name: 'North',
    type: 'REGION'
});

const southRegionId = hm.addNode(hierarchyId, franchiseId, 
    {name: 'South',
    type: 'REGION'
});

hm.addNode(hierarchyId, northRegionId, {
    name: '005',
    type: 'STORE',
    address: '123 North Avenue, Denver, CO'
});

hm.addNode(hierarchyId, northRegionId, {
    name: '012',
    type: 'STORE',
    address: '456 North West Dr., Colorado Springs, CO'
});

hm.addNode(hierarchyId, southRegionId, {
    name: '105',
    type: 'STORE',
    address: '789 Central Blvd, Colorado Springs, CO'
});

hm.addNode(hierarchyId, southRegionId, {
    name: '110',
    type: 'STORE',
    address: '321 Union Road, Colorado Springs, CO'
});

console.log('\nFull Hierarchy\n');
hm.printHierarchy(hierarchyId);

console.log('\nStores under North Region: \n');
console.log(hm.getStores(hierarchyId, northRegionId));

console.log('\nStores under South Region: \n');
console.log(hm.getStores(hierarchyId, southRegionId));