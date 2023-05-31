import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailHide'
})
export class EmailHidePipe implements PipeTransform {
  transform(value: string): string {
    const [username, domain] = value.split('@');
    const hiddenUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${hiddenUsername}@${domain}`;
  }
}
