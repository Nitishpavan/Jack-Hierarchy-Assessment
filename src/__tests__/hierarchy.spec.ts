import { HierarchyManager } from "../HierarchyManager";

describe('HierarchyManager', () => {
    let hm: HierarchyManager;
    let hierarchyId: string;

    beforeEach(() => {
        hm = new HierarchyManager();
        hierarchyId = hm.createHierarchy();
    });

    it('Should create hierarchy with root node', () => {
        expect(typeof hierarchyId).toBe('string');
    });

    it('Should add a Franchise under Root Node', () => {
        const franchiseId = hm.addNode(hierarchyId, hierarchyId, {
            name: 'Nitish Franchise',
            type: 'FRANCHISE',
        });

        expect(typeof franchiseId).toBe('string');
    })

    it('Should add Region under the Franchise and stores under region', () => {
        const franchiseId = hm.addNode(hierarchyId, hierarchyId, {
            name: 'Nitish Franchise',
            type: 'FRANCHISE',
        });

        const regionId = hm.addNode(hierarchyId, franchiseId, {
            name: 'North',
            type: 'REGION',
        });

        const storeId = hm.addNode(hierarchyId, regionId, {
            name: '005',
            type: 'STORE',
            address: '789 Central Blvd, Colorado Springs, CO',
        });

        const stores = hm.getStores(hierarchyId, regionId)
        expect(stores).toHaveLength(1);
        expect(stores[0].name).toBe('005');
        expect(stores[0].type).toBe('STORE');
    })
})