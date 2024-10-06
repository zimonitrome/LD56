import { Player } from './Player';
import { Sprite } from './Sprite';
import asciiSprite from "../sprites/bullet.md";
import { DEBUG } from '../Game';

export class Bullet {
    x: number;
    y: number;
    speed: number = 5;
    // speed: number = 0;
    size: number = 0.5;
    element: HTMLPreElement;
    private sprite: Sprite;
    player: Player;
    private playerElement: HTMLElement | null = null;

    constructor(startX: number, startY: number, player: Player, targetX: number, targetY: number) {
        this.player = player;
        this.playerElement = document.getElementById('player');

        this.x = startX;
        this.y = startY;

        this.sprite = new Sprite(asciiSprite);
        this.sprite.setFrameRate(5);

        // Calculate direction
        const dx = targetX - startX;
        const dy = targetY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const normalizedDx = dx / distance;
        const normalizedDy = dy / distance;

        // Create bullet element
        this.element = document.createElement('pre');
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.size}rem`;
        this.element.style.height = `${this.size}rem`;
        this.element.style.margin = '0';
        this.element.style.lineHeight = '50%';
        if (DEBUG)
            this.element.style.border = '1px solid red';
        this.element.style.borderRadius = '50%';
        this.updatePosition();

        // Add to DOM
        const world = document.getElementById('world');
        if (world) {
            world.appendChild(this.element);
        } else {
            console.error('World element not found');
        }

        // Start moving
        this.update(normalizedDx, normalizedDy);
    }

    private updatePosition() {
        this.sprite.render("main", this.element, this.element, this.x, this.y);
    }

    private update(directionX: number, directionY: number) {
        const moveInterval = setInterval(() => {
            this.x += directionX * this.speed;
            this.y += directionY * this.speed;
            this.updatePosition();

            // Check if bullet is out of bounds
            if (this.isOutOfBounds()) {
                this.destroy();
                clearInterval(moveInterval);
            }
            if (this.checkCollision(this.player)) {
                this.player.takeDamage();
                this.destroy();
                clearInterval(moveInterval);
            }
        }, 16); // 60 FPS
    }

    isOutOfBounds(): boolean {
        const padding = 1000;
        const rect = this.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        return (
            centerX < -padding ||
            centerX > window.innerWidth + padding ||
            centerY < -padding ||
            centerY > window.innerHeight + padding
        );
    }

    checkCollision(player: Player): boolean {
        const bulletRect = this.element.getBoundingClientRect();

        if (!this.playerElement) {
            console.error('Player element not found');
            return false;
        }

        const playerRect = this.playerElement.getBoundingClientRect();

        return !(
            bulletRect.right < playerRect.left ||
            bulletRect.left > playerRect.right ||
            bulletRect.bottom < playerRect.top ||
            bulletRect.top > playerRect.bottom
        );
    }

    destroy() {
        this.element.parentNode?.removeChild(this.element);
    }
}