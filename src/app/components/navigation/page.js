export function navbarNavigation() {
    const navigation = [
        { name: 'Home', href: '/', current: true, ariaLabel: 'Navigate to Home' },
        { name: 'Show Events', href: '../../pagelayout/data', current: false, ariaLabel: 'Navigate to Show Events'  },
        { name: 'Add Event', href: '../../components/addeventdb', current: false, ariaLabel: 'Navigate to Add Event' }
    ];
    
    return { navigation};
}
