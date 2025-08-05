export type NodeType = 'FRANCHISE' | 'REGION' | 'STORE';

export interface BaseNode {
    id: string,
    name: string,
    type: NodeType,
    children?: TreeNode[];
}

export interface StoreNode extends BaseNode {
    address: string;
    type: 'STORE';
}

export type TreeNode = BaseNode | StoreNode;