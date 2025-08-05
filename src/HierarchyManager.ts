import { StoreNode, TreeNode } from "./types";
import { generateId } from "./utils";

export class HierarchyManager {
    private hierarchies: Map<string, TreeNode> = new Map();

    createHierarchy(): string {
        const rootId = generateId();
        const rootNode: TreeNode =  {
            id: rootId,
            name: 'Jack In The Box',
            type: 'FRANCHISE',
            children: [],
        };
        this.hierarchies.set(rootId, rootNode);
        return rootId;
    }

    addNode(hierarchyId: string,parentId: string, nodeData: Partial<TreeNode>): string {
        const root = this.hierarchies.get(hierarchyId);
        if(!root) throw new Error('Hierarchy Not Found');

        const newNode: TreeNode = {
            id: generateId(),
            name: nodeData.name!,
            type: nodeData.type!,
            ...(isStoreNode(nodeData) ? {address: nodeData.address} : {}),
            children: [],
        };

        const parent = this.findNode(root, parentId);
        if(!parent) throw new Error('Parent Node Not Found');
        if(!parent.children) parent.children = [];

        parent.children.push(newNode);
        return newNode.id;
    }

        getStores(hierarchyId: string, nodeId: string): TreeNode[] {
            const root = this.hierarchies.get(hierarchyId);
            if(!root) throw new Error ('Hierarchy Not Found');

            const node = this.findNode(root, nodeId);
            if(!node) throw new Error('Node Not Found');

            const stores: TreeNode[] = [];
            this.collectStores(node,stores);
            return stores;
        }

        private findNode(current: TreeNode, id:string): TreeNode  | null {
            if(current.id === id) return current;
            if(!current.children) return null;

            for (const child of current.children) {
                const found = this.findNode(child, id);
                if (found) return found;
            }

            return null;
        }

        private collectStores(node: TreeNode, stores: TreeNode[]) {
            if(node.type === 'STORE') {
                stores.push(node);
            }

            if(node.children) {
                for(const child of node.children) {
                    this.collectStores(child, stores);
                }
            }
        }

        printHierarchy(hierarchyId: string): void {
            const root = this.hierarchies.get(hierarchyId);
            if(!root) {
                console.log('Hierarchy Not Found');
                return;
            }

            this.printNode(root, 0);
        }

        private printNode(node: TreeNode, level: number) {
            console.log(`${' '.repeat(level)} - ${node.type} - ${node.name}`);
            if(node.children) {
                for(const child of node.children) {
                    this.printNode(child, level+1);
                }
            }
        }
}

function isStoreNode(node: Partial<TreeNode>) : node is StoreNode {
    return node.type === 'STORE' && typeof (node as StoreNode).address === 'string';
}