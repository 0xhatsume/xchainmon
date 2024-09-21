class PlayerClass {
    constructor(gridEngine, fieldMapTileMap, agent_id, bedPosition = { x: 3, y: 3 }) {
        this.gridEngine = gridEngine;
        this.fieldMapTileMap = fieldMapTileMap;
        this.agent_id = agent_id;
        this.sleepiness = 0;
        this.bedPosition = bedPosition;

    }
    
    getCharacterPosition() {
        return this.gridEngine.getPosition(this.agent_id);
    }

    getSurroundings() {
        const playerPosition = this.getCharacterPosition();
        const { x: playerX, y: playerY } = playerPosition;
        
        const surroundings = {
            up: 'walkable',
            down: 'walkable',
            left: 'walkable',
            right: 'walkable'
        };
        
        const directions = [
            { key: 'up', dx: 0, dy: -1 },
            { key: 'down', dx: 0, dy: 1 },
            { key: 'left', dx: -1, dy: 0 },
            { key: 'right', dx: 1, dy: 0 }
        ];
        
        this.fieldMapTileMap.layers.forEach((layer) => {
            const tilemapLayer = layer.tilemapLayer;
        
            directions.forEach((direction) => {
            const tile = tilemapLayer.getTileAt(
                playerX + direction.dx,
                playerY + direction.dy
            );
        
            if (tile && tile.properties.ge_collide) {
                surroundings[direction.key] = 'wall';
            }
            });
        });
    
        return surroundings;
        }

    moveAndCheckCollision(direction, fieldMapTileMap) {
      const currentPosition = this.gridEngine.getPosition(this.agent_id);
      let nextPosition = { ...currentPosition };
    
      switch (direction) {
        case "left":
          nextPosition.x -= 1;
          break;
        case "right":
          nextPosition.x += 1;
          break;
        case "up":
          nextPosition.y -= 1;
          break;
        case "down":
          nextPosition.y += 1;
          break;
        default:
          break;
      }
    
      // Check if the next position has a tile with the 'ge_collide' property set to true
      const collision = fieldMapTileMap.layers.some((layer) => {
        const tile = layer.tilemapLayer.getTileAt(nextPosition.x, nextPosition.y);
        return tile && tile.properties.ge_collide;
      });
    
      if (collision) {
        this.nextMove();
      } else {
        this.gridEngine.move(this.agent_id, direction);
      }
    }

    increaseSleepiness() {
        this.sleepiness = Math.min(this.sleepiness + 1, 10);
    }

}


export default PlayerClass;
