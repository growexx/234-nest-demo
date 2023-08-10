import { dropCollection, getMongoUri } from "./db";

export const endTest = () => describe('Remove seed Data', () => {
    it('Remove collection data', async () => {
        try {
            const uri = getMongoUri()
            await Promise.all([
                dropCollection(uri, 'blog'),
                dropCollection(uri, 'user')
            ])
        } catch (error) {
            console.log('error :: ', error)
        }
    });
});