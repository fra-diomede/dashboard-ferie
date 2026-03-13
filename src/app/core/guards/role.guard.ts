import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = (route.data['roles'] as string[]) ?? [];
    if (roles.length === 0 || this.authService.hasAnyRole(roles)) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}
