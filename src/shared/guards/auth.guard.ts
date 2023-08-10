import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Access, accessList } from './acl.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contexts = context.switchToHttp();
    const req = contexts.getRequest();
    const res = contexts.getResponse();
    const role: number = res.locals.user.role;
    const hasAccess: Access = {
      method: req.method,
      path: req.originalUrl.split('?')[0],
    };
    const aclList: Access[] = accessList[role];
    const isAllowed: Access | undefined = aclList.find((acl) => {
      if (req.params && req.params.id) {
        let path = hasAccess.path.split('/');
        path[path.indexOf(req.params.id)] = ':id';
        hasAccess.path = path.join('/');
      }
      return acl.method === hasAccess.method && acl.path === hasAccess.path;
    });
    console.log('isAllowed :: ', isAllowed);

    if (!isAllowed) {
      throw new NotAcceptableException(
        'You are not authorized to access this resource.',
      );
    }
    return true;
  }
}
