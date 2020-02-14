export type TPermissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export const permissions: TPermissions[] = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

export interface IGroup {
    id: string;
    name: string;
    permissions: Array<TPermissions>;
}
