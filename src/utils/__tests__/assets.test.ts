/**
 * Test file for asset path mapping utilities
 */

import { getAssetPath, getPdfPath, getImagePath, getLogoPath, mapAssetPath, ASSET_MAPPINGS } from '../assets';

describe('Asset Path Utilities', () => {
    describe('getAssetPath', () => {
        it('should handle paths that already start with images/', () => {
            expect(getAssetPath('images/cultark-logo.png')).toBe('/images/cultark-logo.png');
            expect(getAssetPath('/images/cultark-logo.png')).toBe('/images/cultark-logo.png');
        });

        it('should handle paths that start with docs/', () => {
            expect(getAssetPath('docs/AiReport.pdf')).toBe('/docs/AiReport.pdf');
            expect(getAssetPath('/docs/AiReport.pdf')).toBe('/docs/AiReport.pdf');
        });

        it('should handle assets from src/assets directory', () => {
            expect(getAssetPath('assets/site-assets/profile-pic.png')).toBe('/images/profile-pic.png');
        });

        it('should handle external URLs', () => {
            expect(getAssetPath('https://example.com/image.jpg')).toBe('https://example.com/image.jpg');
            expect(getAssetPath('//example.com/image.jpg')).toBe('//example.com/image.jpg');
        });

        it('should add leading slash to relative paths', () => {
            expect(getAssetPath('portfolio/image.jpg')).toBe('/portfolio/image.jpg');
        });
    });

    describe('getPdfPath', () => {
        it('should return correct PDF path', () => {
            expect(getPdfPath('AiReport.pdf')).toBe('/docs/AiReport.pdf');
            expect(getPdfPath('case-study.pdf')).toBe('/docs/case-study.pdf');
        });
    });

    describe('getImagePath', () => {
        it('should return correct image path', () => {
            expect(getImagePath('cultark-logo.png')).toBe('/images/cultark-logo.png');
            expect(getImagePath('hero-image.jpg')).toBe('/images/hero-image.jpg');
        });
    });

    describe('getLogoPath', () => {
        it('should return correct logo path', () => {
            expect(getLogoPath('white-2048x396.png')).toBe('/images/logos/white-2048x396.png');
        });
    });

    describe('mapAssetPath', () => {
        it('should use direct mappings when available', () => {
            expect(mapAssetPath('images/cultark-logo.png')).toBe('/images/cultark-logo.png');
            expect(mapAssetPath('./../../assets/site-assets/profile-pic.png')).toBe('/images/profile-pic.png');
        });

        it('should fall back to getAssetPath for unmapped paths', () => {
            expect(mapAssetPath('some/unknown/path.jpg')).toBe('/some/unknown/path.jpg');
        });
    });

    describe('ASSET_MAPPINGS', () => {
        it('should contain all expected mappings', () => {
            expect(ASSET_MAPPINGS['images/cultark-logo.png']).toBe('/images/cultark-logo.png');
            expect(ASSET_MAPPINGS['/images/cultark-logo.png']).toBe('/images/cultark-logo.png');
            expect(ASSET_MAPPINGS['docs/AiReport.pdf']).toBe('/docs/AiReport.pdf');
            expect(ASSET_MAPPINGS['./../../assets/site-assets/profile-pic.png']).toBe('/images/profile-pic.png');
        });
    });
});