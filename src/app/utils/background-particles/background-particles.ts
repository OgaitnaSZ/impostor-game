import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-background-particles',
  imports: [],
  templateUrl: './background-particles.html',
  styleUrl: './background-particles.css',
})
export class BackgroundParticles {
@ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private particleCount = 100;

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    this.initParticles();
    this.animate();
  }

  @HostListener('window:resize')
  resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      ));
    }
  }

  animate = () => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach(p => {
      p.update(canvas);
      p.draw(this.ctx);
    });

    requestAnimationFrame(this.animate);
  };
}

class Particle {
  radius = Math.random() * 2 + 1;
  vx = (Math.random() - 0.5) * 0.5;
  vy = (Math.random() - 0.5) * 0.5;

  constructor(public x: number, public y: number) {}

  update(canvas: HTMLCanvasElement) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
  }
}
