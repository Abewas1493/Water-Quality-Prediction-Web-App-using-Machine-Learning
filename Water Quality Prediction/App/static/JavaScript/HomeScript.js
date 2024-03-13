            document.querySelector('.logo').addEventListener('mouseenter', function () {
                document.body.classList.add('overlay');
            });

            document.querySelector('.logo').addEventListener('mouseleave', function () {
                document.body.classList.remove('overlay');
            });